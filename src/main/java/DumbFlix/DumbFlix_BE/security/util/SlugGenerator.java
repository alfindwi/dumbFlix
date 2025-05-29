package DumbFlix.DumbFlix_BE.security.util;

public class SlugGenerator {
    public static String generateSlug(String title) {
        return title.toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }

}
