

public class  List<T> {
    private Node<T> node;
  
    public List() {
        this.node = null;               
    }     
   
    public void add(T value) {  
        Node<T> newNode = new Node<T>(value); 
        if(length() == 0) {
            this.node = new Node<T>(value);
        } else {            
            Node<T> lastNode = getLastNode();     
            lastNode.setNext(newNode);        
        } 
    }

    public void addAtBegin(T value) {        
        Node<T> newNode = new Node<T>(value);
        newNode.setNext(this.node);
        this.node=newNode;                      
   }

    private Node<T> getLastNode() {      
        return moveTo(length()-1);       
    }

    public int length() { 
        int lenght=0;   
        Node<T> node = this.node;    
        while (node !=null) {                                  
            node = node.getNext();   
            lenght++;                        
        }              
        return lenght;
    }

    public T getValue(int position) {            
        return moveTo(position).getValue();
    }

    public void delete(int position) {
        Node<T> deletedNode=moveTo(position);
        if(position == 0) {
            Node<T> afterNode=moveTo(position+1);
            this.node=afterNode;           

        } else {
            Node<T> beforeNode=moveTo(position-1);    
            beforeNode.setNext(deletedNode.getNext());
        }                           
    }

   


    private Node<T> moveTo(int position) { 
        Node<T> node = this.node;
       for(int i=0;i<position;i++) {
        node =node.getNext();
       }                          
       return node;
    }
 


}
