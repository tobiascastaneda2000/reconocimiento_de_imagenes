package xyz.dev3k.ateneo2;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.TextView;

import java.util.Timer;
import java.util.TimerTask;

public class TituleActivity extends Activity {

    //TextView animado;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_titule);
        //animado = (TextView) findViewById(R.id.poeticasAletorias_id);

        TimerTask tarea = new TimerTask() {
            @Override
            public void run() {
                Intent intent = new Intent(TituleActivity.this, MainActivity.class);
                startActivity(intent);
                finish();
            }
        };
        Timer tiempo = new Timer();

        tiempo.schedule(tarea, 5000);
        //anim1();

    }
/*

    public void anim1(){
        Animation animation = AnimationUtils.loadAnimation(this,R.anim.rotate);
        animado.startAnimation(animation);

    }*/

}