package pl.justmedia.entity.langage;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.net.URISyntaxException;
import java.nio.file.Path;
import java.util.Map;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.stream.Stream;


@Component
public class Language {

    @Autowired
    private Environment env;

    public static Language instance;
    private Map<String,String> messages = new HashMap<>();

    public Language() {
    }
    public static Language getInstance() {
        if (Language.instance == null) instance = new Language();
        return instance;
    }

    public String getMessage(String key) {
        return this.messages.get(key);
    }

    public void setMessages(String langFile) {

        String delimiter = ":";
        Path path = null;
        try {
            path = Paths.get(ClassLoader.getSystemResource(langFile).toURI());
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        try(Stream<String> lines = Files.lines(path)){
            lines.filter(line -> line.contains(delimiter)).forEach(
                    line -> this.messages.putIfAbsent(line.split(delimiter)[0], line.split(delimiter)[1])
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}