import { Component, OnInit, Input, Output, AfterContentInit, ContentChild,AfterViewInit, ViewChild, ViewChildren } from '@angular/core';
import { Message } from '../../models';
import { DialogflowService } from '../../services';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  @ViewChildren('inputText') inpuText;

  @Input('message')
  public message : Message;

  @Input('messages')
  private messages : Message[];

  constructor(private dialogFlowService: DialogflowService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {            
    this.inpuText.first.nativeElement.focus();
  }

  public sendMessage(): void {
    if(this.message.content) {
      this.message.timestamp = new Date();
      this.messages.push(this.message);

      this.dialogFlowService.getResponse(this.message.content).subscribe(res => {
        this.messages.push(
          new Message(res.result.fulfillment.speech, 'assets/images/bot.png', res.timestamp)
        );
      });

      this.message = new Message('', 'assets/images/user.png');
    }
    this.inpuText.first.nativeElement.focus();
  }

  public keyPressFunction(event) {
    //console.log(event);
    // si premem la tecla return
    if(event.keyCode == 13) {
      this.sendMessage();
    }
  }
 
}
