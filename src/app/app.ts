import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('product-crud-app')
  
  
  ngOnInit(): void {
    // console.log("=====> Duplicate charactor find out <=======")
    //Using Map
    // let str="abcbdeaf";
    // const freq = new Map();
    // for(let char of str){
    //   freq.set(char,freq.get(char) ? freq.get(char)+1 : 1);
    // }
    // const duplicate=[];
    // for(let [char,count] of freq){
    //   if(count > 1) duplicate.push(char);
    // }
    // console.log("freq : ",freq);
    // console.log("Char : ",duplicate);

    //Using Set
    // const seen= new Set();
    // const duplicates= new Set();

    // for(let char of str){
    //   if(seen.has(char)){
    //     duplicates.add(char);
    //   }
    //   else{
    //     seen.add(char);
    //   }
    // }
    // console.log("duplicates ",[...duplicates])

    // console.log("=====> find palindrome <=======")
    // let str="abceba";
    // console.log("isPalindrome ",this.isPalindrome(str));

    let arr= [1,2,3,4,5];
    // let newArr= arr.map((el)=> el+"x");
    // let arr= ['vishal','raj','sunil','rakesh'];
    let newArr:any= arr.map((el)=> ({"value":el}));
    console.log("arr ",arr)
    console.log("newarr ",newArr)
  }

  isPalindrome(str:any):boolean{
    // bruth force
    // const reverseStr=str.split('').reverse().join('');
    // return str===reverseStr;

    // optimize
    let left=0;
    let right=str.length -1;

    while(left<right){
      if(str[left] != str[right]) return false;
      left++;
      right--;
    }
    return true;
  }
}
