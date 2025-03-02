import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';

@Component({
  selector: 'app-product',
  standalone: true, 
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule,MatTableModule], 
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: any[] = [];
  productId: number | null = null;
  displayedColumns: string[] = ['id', 'images', 'title', 'category', 'price', 'tax', 'total'];
  
  readonly dialog = inject(MatDialog);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  getAllProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  getProductById(): void {
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe({
        next: (data) => {
          this.products = [data];
        },
        error: (err) => {
          this.dialog.open(DialogModalComponent, { 
            data: { message: JSON.stringify(err.error) } // Convierte a string
          });
          this.products = [];
        }
      });
    } else {
      this.getAllProducts();
    }
  }
}
