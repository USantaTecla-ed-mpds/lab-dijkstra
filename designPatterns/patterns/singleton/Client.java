package designPatterns.patterns.singleton;

public class Client {

	private void exec() throws SingletonException {
		//...
		for(int i=0; i<10; i++){
			Singleton.instance().m();
		}
		// ...
	}

	public static void main(String[] args) {
		try {
			new Client().exec();
		} catch (SingletonException e) {
			System.out.println("ERROR: " + e.getMessage());
		}
	}

}
