package eu.zaantar.fofrmetro;

import javax.xml.xpath.XPathExpressionException;

import android.support.v7.app.ActionBarActivity;
import android.content.Context;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;
import android.widget.ToggleButton;


public class MainActivity extends ActionBarActivity {

	private MetroContext metroContext;
	
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        try {
        	java.io.InputStream stream = getApplicationContext().getResources().openRawResource(R.xml.data);
        	metroContext = new MetroContext(stream);
        } catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
        }
        
        // toggle listener for metroLineSelection
        ((RadioGroup) findViewById(R.id.metroLineSelection)).setOnCheckedChangeListener(ToggleListener);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
    
    public void onToggle(View view) {
        ((RadioGroup)view.getParent()).check(view.getId());
        
        /*Context context = getApplicationContext();
        CharSequence text = "You have selected button" + view.getId();
        int duration = Toast.LENGTH_SHORT;

        Toast toast = Toast.makeText(context, text, duration);
        toast.show();*/
    }
    
    final RadioGroup.OnCheckedChangeListener ToggleListener = new RadioGroup.OnCheckedChangeListener() {
		@Override
		public void onCheckedChanged(RadioGroup radioGroup, int checkedId) {
			for (int j = 0; j < radioGroup.getChildCount(); j++) {
                final ToggleButton view = (ToggleButton) radioGroup.getChildAt(j);
                view.setChecked(view.getId() == checkedId);
            }
				        
			ToggleButton checkedButton = (ToggleButton) findViewById(radioGroup.getCheckedRadioButtonId());
	        try {
				String[] directions = metroContext.getDirectionsForLine(checkedButton.getText().toString());
				RadioButton direction1 = (RadioButton) findViewById(R.id.direction1Radio);
				RadioButton direction2 = (RadioButton) findViewById(R.id.direction2Radio);
				direction1.setText(directions[0]);
				direction2.setText(directions[1]);
			} catch (XPathExpressionException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	};
}
