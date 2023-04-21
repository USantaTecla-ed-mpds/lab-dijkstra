package designPatterns.patterns.singleton;

public class ASingleton extends Singleton {

	public ASingleton(String name) {
		super(name);
	}

	public void m() {
		System.out.println("Ejecución de m de ASingleton del objeto: " + name);
	}
	
}
