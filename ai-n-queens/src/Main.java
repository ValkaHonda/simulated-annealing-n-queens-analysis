import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.net.URL;
import java.util.logging.*;

// Max number of Iterations 50000
// Temperature 120
// Cooling Factor 0.95
/**
 * Created by mrsfy on 27-Mar-17.
 */
public class Main extends Application {

    public static void main(String[] args) {
        launch(args);
    }

    private Logger LOG = Logger.getLogger(Main.class.getName());

    @Override
    public void start(Stage primaryStage) throws Exception {
        URL beforeLoad = getClass().getResource("./session.fxml");
        String name = Main.class.getName();
        String fileName = beforeLoad.getFile();

        Parent beforeScene = FXMLLoader.load(beforeLoad);
        Scene scene = new Scene(beforeScene);


        primaryStage.setScene(scene);
        primaryStage.setHeight(675);
        primaryStage.setWidth(753);
        primaryStage.setResizable(false);
        primaryStage.show();


    }

}