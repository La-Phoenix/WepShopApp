import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './Components/Header/header.component';
import { HomeComponent } from './Pages/Home/home.component';
import { ProductsHeaderComponent } from './Components/ProductsHeader/productsheader.component';
import { FiltersComponent } from './Components/Filters/filters.component';
import { ProductBoxComponent } from './Components/ProductsBox/productsbox.component';
import { CartComponent } from './Pages/Cart/cart.component';
import { CartService } from './Services/cart.service';
import { StoreService } from './Services/store.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsHeaderComponent,
    FiltersComponent,
    ProductBoxComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [CartService, StoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
