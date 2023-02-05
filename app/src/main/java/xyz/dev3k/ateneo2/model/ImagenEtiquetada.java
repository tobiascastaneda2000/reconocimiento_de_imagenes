package xyz.dev3k.ateneo2.model;

import com.google.mlkit.vision.label.ImageLabel;

import java.util.List;

public class ImagenEtiquetada {
    private List<ImageLabel> labels;
    private String nameFile;

    public ImagenEtiquetada(List<ImageLabel> labels, String nameFile) {
        this.labels = labels;
        this.nameFile = nameFile;
    }

    public String getNameFile() {
        return nameFile;
    }

    public void setNameFile(String nameFile) {
        this.nameFile = nameFile;
    }

    public List<ImageLabel> getLabels() {
        return labels;
    }

    public void setLabels(List<ImageLabel> labels) {
        this.labels = labels;
    }
}
