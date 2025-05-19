package DumbFlix.DumbFlix_BE.security.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.multipart.MultipartFile;

import DumbFlix.DumbFlix_BE.exception.FuncErrorException;
import lombok.experimental.UtilityClass;

@UtilityClass
public class FileUploadUtil {

    public static final long MAX_FILE_SIZE = 2 * 1824 * 1024;

    public static final String IMAGE_PATTERN = "([^\\s]+(\\.(?i)(jpg|png|jpeg|gif))$)";

    public static final String DATE_FORMAT = "yyyy-MM-dd";

    public static final String FINAL_NAME_FORMAT = "%s_%s_%s";

    public static final boolean isAllowedExtension(final String fileName, final String pattern) {
        final Matcher matcher = Pattern.compile(pattern, Pattern.CASE_INSENSITIVE).matcher(fileName);
        return matcher.matches();
    }

    public static void assertAllowed(MultipartFile file, String pattern) {
       
        final long size = file.getSize();

        if (size > MAX_FILE_SIZE) {
            throw new FuncErrorException("Max file size is 2MB");
        }

        final String fileName = file.getOriginalFilename();

        if(!isAllowedExtension(fileName, pattern)){
            throw new FuncErrorException("Only jpg, jpeg, gif, png, files are allowed");
        }
    }

    public static String getFileName(final String name) {
        final DateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);
        final String date = dateFormat.format(System.currentTimeMillis());

        return String.format(FINAL_NAME_FORMAT, name, date);
    }
}
