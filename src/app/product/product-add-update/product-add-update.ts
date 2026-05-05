import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractAddUpdate } from '../../core/base/abstract-add-update';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { productModal } from '../modal/product.modal';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { RadioButton } from 'primeng/radiobutton';
import { environment } from '../../../assets/environment';

@Component({
  selector: 'app-product-add-update',
  imports: [ButtonModule, ReactiveFormsModule, FormsModule,CommonModule,SelectModule,RadioButton],
  templateUrl: './product-add-update.html',
  styleUrl: './product-add-update.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductAddUpdate extends AbstractAddUpdate<any> implements OnInit {

  form!:FormGroup;
  submitted:boolean=false;
  override data:productModal=new productModal();
  categoryList=[
    {
      text:"Electrition",
      value:"Electrition"
    },
    {
      text:"Ferniture",
      value:"Ferniture"
    }
  ];
  currencyList=[
    {
      text:"INR",
      value:"INR"
    },
    {
      text:"US",
      value:"US"
    }
  ]
  override isLocalStorage=environment.ISLOCALSTORAGE;
  override moduleName:string="products";
  
  constructor(
    private fb:FormBuilder,
    route: Router,
    activeRoute:ActivatedRoute,
    private cdr:ChangeDetectorRef
  ){
    super(route,activeRoute);
    this.setValidation();
  }


  ngOnInit(): void {
      this.init();
  }

  setValidation(){
    this.form=this.fb.group({
      name:['',[Validators.required,Validators.maxLength(30)]],
      category:[null,[Validators.required]],
      currency:[null,[Validators.required]],
      price:[0,[Validators.required,Validators.maxLength(30)]],
      status:[null,[Validators.required]]
    })  
  }

  getLSListName (){
    return 'productList';
  }


  onSubmit(): void {

    this.submitted=true;
    if(this.form.invalid){
      alert("Please fill all required feild")
      return;
    }
    this.onSubmitData();    
    this.onBack();
  }

  getData(){
    return this.data;
  }

  setData(data:any){
    this.data = data;
    console.log("set Data ",data)
    this.cdr.detectChanges()
  }


  get f(){
    return this.form.controls;
  }

  onBack(){
    this.route.navigate(["products"])
  }

}
