package dev.btcpp.childwallet.util;

import java.io.IOException;
import java.io.Reader;

import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class CommandLine {
	
	private static final Log log = LogFactory.getLog(CommandLine.class);
	
    private CommandLine() {
        throw new IllegalStateException("Utility class");
    }
    
    public static void exec(String command) throws IOException, InterruptedException {
    	
        ProcessBuilder processBuilder = new ProcessBuilder(command);

        Process process = processBuilder.start();
        process.waitFor();        
        int exitValue = process.exitValue();
        if (exitValue != 0) {
        	try (Reader inputReader = process.inputReader()) {
        		String stdout = IOUtils.toString(inputReader);
        		log.info(stdout);
        	}
        	try (Reader errorReader = process.errorReader()) {
        		String stderr = IOUtils.toString(errorReader);
            	throw new IOException("CreateProcess error="+exitValue+" "+stderr);
        	}
        }
        
    	log.debug("FIM");
    }

}
