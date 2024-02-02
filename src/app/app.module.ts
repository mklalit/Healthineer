import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultationComponent } from './pages/consultation/consultation.component';
import { PhysicianComponent } from './pages/physician/physician.component';
import { ChartComponent } from './pages/consultation/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsultationComponent,
    PhysicianComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
