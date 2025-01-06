import { NgModule } from '@angular/core';
import { Angulartics2Module } from 'angulartics2';

@NgModule({
  imports: [Angulartics2Module.forRoot()],
  exports: [Angulartics2Module],
})
export class Angulartics2StandaloneModule {}
