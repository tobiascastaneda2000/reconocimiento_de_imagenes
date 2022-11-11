package xyz.dev3k.ateneo2.Fragments;

import android.graphics.Color;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import xyz.dev3k.ateneo2.R;


public class MainFragment extends Fragment implements View.OnClickListener {

    //Button btnComenzar;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {


        View view = inflater.inflate(R.layout.fragment_main, container, false);

        Button btnComenzar = view.findViewById(R.id.button_comenzar);

        btnComenzar.setOnClickListener(this);
        return view;
    }

    @Override
    public void onClick(View view) {
        FragmentManager fragmentManager = getActivity().getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();

        fragmentTransaction.replace(R.id.container_id, new CameraFragment());
        fragmentTransaction.addToBackStack(null);

        fragmentTransaction.commit();
    }

}