

public class  Node<T> {
    final private T value;    
    private Node<T> next;

    public Node(T value) {
        this.value = value;    
        this.next = null;       
    }

    public T getValue() {
        return this.value;
    }
    public void setNext(Node<T> node) {
        this.next = node;    
    }

    public Node<T> getNext() {
        return this.next;
    }
    
}
