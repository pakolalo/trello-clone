import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { Colors } from '@models/colors.model';
import { BoardsService } from '@services/boards.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html'
})
export class BoardFormComponent {

  form = this.formBuilder.nonNullable.group({
    title:['', [Validators.required]],
    backgroundColor: new FormControl<Colors>('sky', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

constructor(
  private formBuilder: FormBuilder,
  private boardService: BoardsService,
  private router: Router,
) {}

doSave() {
  if(this.form.valid) {
    const {title, backgroundColor} = this.form.getRawValue()
    this.boardService.createBoard(title, backgroundColor)
    .subscribe(board => {
      this.router.navigate(['/app/boards', board.id])
    })

  } else {
    this.form.markAllAsTouched();
  }
}

}
