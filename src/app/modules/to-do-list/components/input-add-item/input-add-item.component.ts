import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';

// Interfaces
import { IListItems } from '../../interface/IListItems.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  // Pegando a variavel de fora
  @ViewChild("inputText") public InputText!: ElementRef

  @Input({ required: true }) public inputListItems: IListItems[] = [];
  // EventEmitter vai está emitido as infos para fora
  @Output() public outputAddListItem = new EventEmitter<IListItems>();

  public focusAndAddItem(value: string) {
    if(value) {
      this.#cdr.detectChanges();
      this.InputText.nativeElement.value = '';

      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID ${timestamp}`

      this.outputAddListItem.emit({
        id,
        checked: false,
        value
      });

      return this.InputText.nativeElement.focus();
    }
  }
}
