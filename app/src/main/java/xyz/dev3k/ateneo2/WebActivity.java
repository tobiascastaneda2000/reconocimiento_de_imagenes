package xyz.dev3k.ateneo2;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class WebActivity extends AppCompatActivity {

    String url = "https://poeticaleatoria.web.app/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web);

        WebView web = (WebView) findViewById(R.id.miVisor);
        web.setWebViewClient(new MyWebViewClient());
        WebSettings settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        web.loadUrl(url);
    }

    private static class MyWebViewClient extends WebViewClient {

        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url);
            return true;
        }

    }
}