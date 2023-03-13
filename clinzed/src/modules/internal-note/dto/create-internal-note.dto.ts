import { ApiProperty } from "@nestjs/swagger";

export class CreateInternalNoteDto {
    @ApiProperty({ type: String })
  
  readonly messageBody: string;
  
}
