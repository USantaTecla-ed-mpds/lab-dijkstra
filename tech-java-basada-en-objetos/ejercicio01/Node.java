

public class Node {
    private Coordinate coordinate;    
    private Node next;

    public Node(Coordinate coordinate) {
        this.coordinate = coordinate;    
        this.next = null;       
    }
git 
    public Coordinate getCoordinate() {
        return this.coordinate;
    }
    public void setNext(Node node) {
        next = node;
    }

    public Node getNext() {
        return this.next;
    }
    
}
