package DumbFlix.DumbFlix_BE.security.util;

public class SlugGenerator {
    public static String generateSlug(String input) {
        return input
                .toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "") 
                .replaceAll("\\s+", "-");     
    }
}

