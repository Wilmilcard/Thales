import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: any[] = [];
  productId: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    console.log('Obteniendo productos...'); // 🔹 Mensaje antes de la llamada
    this.productService.getProducts().subscribe(data => {
      console.log('Productos recibidos:', data);
      this.products = data;
    });
  }

  getProductById(): void {
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(data => {
        this.products = [data];
      });
    } else {
      this.getAllProducts();
    }
  }
}
