package xyz.dev3k.ateneo2;

import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Point;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.label.ImageLabel;
import com.google.mlkit.vision.label.ImageLabeler;
import com.google.mlkit.vision.label.ImageLabeling;
import com.google.mlkit.vision.label.defaults.ImageLabelerOptions;
import com.google.mlkit.vision.pose.Pose;
import com.google.mlkit.vision.pose.PoseDetection;
import com.google.mlkit.vision.pose.PoseDetector;
import com.google.mlkit.vision.pose.PoseLandmark;
import com.google.mlkit.vision.pose.accurate.AccuratePoseDetectorOptions;
import com.google.mlkit.vision.text.Text;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;
import com.google.mlkit.vision.text.latin.TextRecognizerOptions;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import xyz.dev3k.ateneo2.model.ImagenEtiquetada;

public class AnalysisActivity extends AppCompatActivity implements View.OnClickListener {
    private ImageView image;
    private InputImage imageInput;
    private Task<Text> result;
    private Task<Pose> resultPoses;
    FirebaseFirestore db = FirebaseFirestore.getInstance();
    //Reference Firebase starage
    FirebaseStorage storage = FirebaseStorage.getInstance();
    // Create a Cloud Storage reference from the app
    StorageReference storageRef= storage.getReference("/Images");
    ImageLabeler labeler = ImageLabeling.getClient(ImageLabelerOptions.DEFAULT_OPTIONS);

    TextRecognizer recognizer =
            TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS);

    AccuratePoseDetectorOptions options =
            new AccuratePoseDetectorOptions.Builder()
                    .setDetectorMode(AccuratePoseDetectorOptions.SINGLE_IMAGE_MODE)
                    .build();
    PoseDetector poseDetector = PoseDetection.getClient(options);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_analysis);
        cargarImagen();
        image = (ImageView) findViewById(R.id.analysis_iv);

        Button buttonAnalyzer = findViewById(R.id.button_analizer);
        Button buttonTextRecognizer = findViewById(R.id.button_text_recognizer);
        Button buttonPosesDetect = findViewById(R.id.button_poses_detect);

        buttonTextRecognizer.setOnClickListener(this);
        buttonAnalyzer.setOnClickListener(this);
        buttonPosesDetect.setOnClickListener(this);

        // inicializarFirebase();

    }

    /**
     * private void inicializarFirebase() {
     * FirebaseApp.initializeApp(this);
     * database = FirebaseDatabase.getInstance();
     * myRef = database.getReference();
     * }
     */

    public void cargarImagen() {
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        intent.setType("image/");
        startActivityForResult(intent.createChooser(intent, "Seleccione la aplicación"), 10);
    }
    Uri path;
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK) {
            path = data.getData();
            image.setImageURI(path);

            try {
                imageInput = InputImage.fromFilePath(this, path);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.button_analizer:
                etiquetarImagen();
                break;
            case R.id.button_text_recognizer:
                runTextRecognizer();
                break;
            case R.id.button_poses_detect:
                runDetectPoses();
                break;
        }
    }

    public void etiquetarImagen() {
        labeler.process(imageInput)
                .addOnSuccessListener(new OnSuccessListener<List<ImageLabel>>() {

                    @Override
                    public void onSuccess(List<ImageLabel> labels) {
                        Toast.makeText(AnalysisActivity.this, "Etiquetas:", Toast.LENGTH_SHORT).show();
                        for (ImageLabel label : labels) {
                            String text = label.getText();
                            float confidence = label.getConfidence();//grado de confianza de la etiqueta
                            int index = label.getIndex();
                            Toast.makeText(AnalysisActivity.this, text, Toast.LENGTH_SHORT).show();
                            Log.d(TAG, "Etiqueta: " + labels);
                        }
                        String fileName = new Date().toString();
                        // Create a reference
                        StorageReference filePath = storageRef.child(fileName);

                        filePath.putFile(path).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                            @Override
                            public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                                Toast.makeText(AnalysisActivity.this, "Imagen guardada en storage", Toast.LENGTH_SHORT).show();
                            }
                        });

                        ImagenEtiquetada imagenEtique = new ImagenEtiquetada(labels, fileName);
                        db.collection("ImagenesEtiquetadas")
                                .add(imagenEtique)
                                .addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                                    @Override
                                    public void onSuccess(DocumentReference documentReference) {
                                        Log.d(TAG, "DocumentSnapshot added with ID: " + documentReference.getId());
                                    }
                                })
                                .addOnFailureListener(new OnFailureListener() {
                                    @Override
                                    public void onFailure(@NonNull Exception e) {
                                        Log.w(TAG, "Error adding document", e);
                                    }
                                });
                        Toast.makeText(AnalysisActivity.this, "Imagen etiquetada y guardada", Toast.LENGTH_SHORT).show();

                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Toast.makeText(AnalysisActivity.this, "Error, no se etiquetó la imagen", Toast.LENGTH_SHORT).show();
                    }
                });
    }

    private void runTextRecognizer() {
        result =
                recognizer.process(imageInput)
                        .addOnSuccessListener(new OnSuccessListener<Text>() {
                            @Override
                            public void onSuccess(Text visionText) {
                                Toast.makeText(AnalysisActivity.this, "Se reconoció el texto", Toast.LENGTH_SHORT).show();
                                processTextRecognitionResult(visionText);
                            }
                        })
                        .addOnFailureListener(
                                new OnFailureListener() {
                                    @Override
                                    public void onFailure(@NonNull Exception e) {
                                        Toast.makeText(AnalysisActivity.this, "Error, no se reconoció el texto", Toast.LENGTH_SHORT).show();
                                    }
                                });
    }

    private void processTextRecognitionResult(Text result) {
        String resultText = result.getText();
        Toast.makeText(AnalysisActivity.this, resultText, Toast.LENGTH_SHORT).show();
        for (Text.TextBlock block : result.getTextBlocks()) {
            String blockText = block.getText();
            Point[] blockCornerPoints = block.getCornerPoints();
            Rect blockFrame = block.getBoundingBox();
            for (Text.Line line : block.getLines()) {
                String lineText = line.getText();
                Point[] lineCornerPoints = line.getCornerPoints();
                Rect lineFrame = line.getBoundingBox();
                for (Text.Element element : line.getElements()) {
                    String elementText = element.getText();
                    Point[] elementCornerPoints = element.getCornerPoints();
                    Rect elementFrame = element.getBoundingBox();
                }
            }
        }
    }

    private void runDetectPoses() {
        resultPoses =
                poseDetector.process(imageInput)
                        .addOnSuccessListener(
                                new OnSuccessListener<Pose>() {
                                    @Override
                                    public void onSuccess(Pose pose) {
                                        Toast.makeText(AnalysisActivity.this, "La pose se detectó ok!!", Toast.LENGTH_SHORT).show();
                                        // Get all PoseLandmarks. If no person was detected, the list will be empty
                                        List<PoseLandmark> allPoseLandmarks = pose.getAllPoseLandmarks();

                                        // Or get specific PoseLandmarks individually. These will all be null if no person
                                        // was detected
                                        PoseLandmark leftShoulder = pose.getPoseLandmark(PoseLandmark.LEFT_SHOULDER);
                                        PoseLandmark rightShoulder = pose.getPoseLandmark(PoseLandmark.RIGHT_SHOULDER);
                                        PoseLandmark leftElbow = pose.getPoseLandmark(PoseLandmark.LEFT_ELBOW);
                                        PoseLandmark rightElbow = pose.getPoseLandmark(PoseLandmark.RIGHT_ELBOW);
                                        PoseLandmark leftWrist = pose.getPoseLandmark(PoseLandmark.LEFT_WRIST);
                                        PoseLandmark rightWrist = pose.getPoseLandmark(PoseLandmark.RIGHT_WRIST);
                                        PoseLandmark leftHip = pose.getPoseLandmark(PoseLandmark.LEFT_HIP);
                                        PoseLandmark rightHip = pose.getPoseLandmark(PoseLandmark.RIGHT_HIP);
                                        PoseLandmark leftKnee = pose.getPoseLandmark(PoseLandmark.LEFT_KNEE);
                                        PoseLandmark rightKnee = pose.getPoseLandmark(PoseLandmark.RIGHT_KNEE);
                                        PoseLandmark leftAnkle = pose.getPoseLandmark(PoseLandmark.LEFT_ANKLE);
                                        PoseLandmark rightAnkle = pose.getPoseLandmark(PoseLandmark.RIGHT_ANKLE);
                                        PoseLandmark leftPinky = pose.getPoseLandmark(PoseLandmark.LEFT_PINKY);
                                        PoseLandmark rightPinky = pose.getPoseLandmark(PoseLandmark.RIGHT_PINKY);
                                        PoseLandmark leftIndex = pose.getPoseLandmark(PoseLandmark.LEFT_INDEX);
                                        PoseLandmark rightIndex = pose.getPoseLandmark(PoseLandmark.RIGHT_INDEX);
                                        PoseLandmark leftThumb = pose.getPoseLandmark(PoseLandmark.LEFT_THUMB);
                                        PoseLandmark rightThumb = pose.getPoseLandmark(PoseLandmark.RIGHT_THUMB);
                                        PoseLandmark leftHeel = pose.getPoseLandmark(PoseLandmark.LEFT_HEEL);
                                        PoseLandmark rightHeel = pose.getPoseLandmark(PoseLandmark.RIGHT_HEEL);
                                        PoseLandmark leftFootIndex = pose.getPoseLandmark(PoseLandmark.LEFT_FOOT_INDEX);
                                        PoseLandmark rightFootIndex = pose.getPoseLandmark(PoseLandmark.RIGHT_FOOT_INDEX);
                                        PoseLandmark nose = pose.getPoseLandmark(PoseLandmark.NOSE);
                                        PoseLandmark leftEyeInner = pose.getPoseLandmark(PoseLandmark.LEFT_EYE_INNER);
                                        PoseLandmark leftEye = pose.getPoseLandmark(PoseLandmark.LEFT_EYE);
                                        PoseLandmark leftEyeOuter = pose.getPoseLandmark(PoseLandmark.LEFT_EYE_OUTER);
                                        PoseLandmark rightEyeInner = pose.getPoseLandmark(PoseLandmark.RIGHT_EYE_INNER);
                                        PoseLandmark rightEye = pose.getPoseLandmark(PoseLandmark.RIGHT_EYE);
                                        PoseLandmark rightEyeOuter = pose.getPoseLandmark(PoseLandmark.RIGHT_EYE_OUTER);
                                        PoseLandmark leftEar = pose.getPoseLandmark(PoseLandmark.LEFT_EAR);
                                        PoseLandmark rightEar = pose.getPoseLandmark(PoseLandmark.RIGHT_EAR);
                                        PoseLandmark leftMouth = pose.getPoseLandmark(PoseLandmark.LEFT_MOUTH);
                                        PoseLandmark rightMouth = pose.getPoseLandmark(PoseLandmark.RIGHT_MOUTH);

                                        printPoseLandmark(allPoseLandmarks);
                                    }
                                })
                        .addOnFailureListener(
                                new OnFailureListener() {
                                    @Override
                                    public void onFailure(@NonNull Exception e) {
                                        Toast.makeText(AnalysisActivity.this, "Error, no se detectó la pose", Toast.LENGTH_SHORT).show();
                                    }
                                });
    }

    private void printPoseLandmark(List<PoseLandmark> allPoseLandmarks) {
        for (PoseLandmark pose : allPoseLandmarks) {
            pose.toString();
            pose.getPosition().toString();
            Toast.makeText(AnalysisActivity.this, pose.getPosition().toString(), Toast.LENGTH_SHORT).show();
        }
    }
}