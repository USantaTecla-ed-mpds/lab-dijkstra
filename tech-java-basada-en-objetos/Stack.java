

public class  Stack<T> {    
    private List<T> list;  
    public Stack() {
        list=new List<T>();               
    }     
   
      public void push(T value) {        
        list.addAtBegin(value);                              
   }

    public void pop() {
        list.delete(0);                   
    }

    public T pick() {
        return list.getValue(0);
    }

    
    public T getValue(int position) {            
        return list.getValue(position);
    }



    public int length() {
        return list.length();
    }

   

}