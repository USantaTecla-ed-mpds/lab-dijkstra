package designPatterns.patterns.singleton;

public class BSingleton extends Singleton {

	public BSingleton(String name) {
		super(name);
	}

	public void m() {
		System.out.println("Ejecución de m de BSingleton del objeto: " + name);
	}
	
}
