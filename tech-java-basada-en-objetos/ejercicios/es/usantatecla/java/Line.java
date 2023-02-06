package es.usantatecla.java;

public class Line {
    private Node node;
  
    public Line() {
        this.node = null;               
    }
    
    public Line(Coordinate coordinate) {
        this.node = new Node(coordinate);     
    }
    
    public void enqueue(Coordinate coordinate) {   
        Node nextNode = new Node(coordinate);   
        if(this.node!=null) {            
            getLastNode().setNext(nextNode); 
        }  else {
            this.node=nextNode;
        }               
    }

    public void push(Coordinate coordinate) {        
          Node newFirstNode = new Node(coordinate);
          newFirstNode.setNext(this.node);
          this.node=newFirstNode;        
                
    }

    private Node getLastNode() {
        Node node = this.node;
        while (node.getNext() != null) {
            node = node.getNext();            
        }
        return node;
    }

    public int lenght() { 
        int lenght=0;       
        if(this.node!=null) {    
            lenght = 1;        
            Node node = this.node;
            do {
                node = node.getNext();   
                lenght++;  
            } while (node.getNext() != null);            
        }       
        return lenght;
    }

    public Coordinate getCoordinate(int position) {
        Node node = this.node;
       for(int i=0;i==position;i++)            
            node = node.getNext();                                      
        return node.getCoordinate();
    }
}
