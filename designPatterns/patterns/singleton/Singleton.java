package designPatterns.patterns.singleton;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

import java.lang.reflect.Constructor;


abstract class Singleton {

	private static List<Singleton> singletonList = new ArrayList<Singleton>();

	private static final String[] NAMES = {"A", "B", "C"};
	
	private static final int MAX = NAMES.length;
	
	private static int turn = 0;

	public static Singleton instance() throws SingletonException {
		if (singletonList.size() < MAX) {
			try {
				singletonList.add(Singleton.getClazz(NAMES[turn]));
			} catch (IOException | ReflectiveOperationException e) {
				throw new SingletonException(e.getMessage());
			}
		}
		int turn = Singleton.turn;
		Singleton.turn = (Singleton.turn + 1)%MAX;
		return singletonList.get(turn);
	}

	private static Singleton getClazz(String name) throws IOException, ReflectiveOperationException {
		Singleton singleton = null;
		String line = Singleton.getSingletonConfigure();
		try {
			Class<?> clase = Class.forName("designPatterns.patterns.singleton." + line);
			Constructor<?> constructor = clase.getConstructor(String.class);
			singleton = (Singleton) constructor.newInstance(name);
		} catch (ReflectiveOperationException e) {
			throw new ReflectiveOperationException("Problemas al crear clase " + e.getMessage());
		}
		return singleton;
	}

	private static String getSingletonConfigure() throws IOException {
		BufferedReader in = null;
		String line = "";
		try {
			in = new BufferedReader(new FileReader("singletonConfigure"));
			line = in.readLine().substring(13);
		} catch (IOException e) {
			throw new IOException("Problema al leer archivo: " + e.getMessage());
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					throw new IOException("Problema al cerrar archivo: " + e.getMessage());
				}
			}
		}
		return line;
	}

	protected String name;
	
	protected Singleton(String name) {
		this.name = name;
	}

	abstract void m();
}
