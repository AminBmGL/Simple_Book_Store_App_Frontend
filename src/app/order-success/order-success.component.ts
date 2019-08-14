import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
shipping
  constructor(private route :ActivatedRoute) { }

  ngOnInit() {
    this.shipping = this.route.snapshot.queryParamMap.get('shipping');
  }

}
