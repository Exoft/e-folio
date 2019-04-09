import { Component, OnInit } from '@angular/core';
import { Developer } from '../../models/developer.model';
import { DeveloperServiceService } from 'src/app/services/developer-service.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-developers-page',
  templateUrl: './developers-page.component.html',
  styleUrls: ['./developers-page.component.scss']
})
export class DevelopersPageComponent implements OnInit {
  public developersInput: Developer = new Developer(0, '', '', '', null);
  constructor(private developerService: DeveloperServiceService,
    private route: ActivatedRoute,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.startLoading();

    const id =+ this.route.snapshot.paramMap.get('id');

    this.developerService.getOneDeveloper(id)
      .subscribe(
        (res)=>{
          this.developersInput = new Developer(
            res.id, 
            res.fullName, 
            res.internalCV,
            res.externalCV,
            res.photoBase64
            );
            this.loaderService.stopLoading();
        }
      );
  }

}
