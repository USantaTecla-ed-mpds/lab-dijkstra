package Stack;

public  class  Node {
    final private Integer value;    
    private Node next;

    public Node(Integer value) {
        this.value = value;    
        this.next = null;       
    }

    public Integer getValue() {
        return this.value;
    }
    public void setNext(Node node) {
        this.next = node;    
    }
    public Node getNext() {
        return this.next;
    }
    
}
