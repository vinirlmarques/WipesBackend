import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from "class-validator";

export class ServerDTO {
  @IsString()
  @IsNotEmpty({ message: "The field serverName cannot be empty" })
  serverName!: string;

  @IsString()
  @IsNotEmpty({ message: "The field region cannot be empty" })
  region!: string;

  @IsString()
  @IsNotEmpty({ message: "The field wipeDate cannot be empty" })
  @IsDateString(
    {},
    { message: "The field wipeDate must be a valid date format (YYYY-MM-DD)" }
  )
  wipeDate!: string;

  @IsString()
  @IsNotEmpty({ message: "The field battlemetricsUrl cannot be empty" })
  battlemetricsUrl!: string;

  @IsString()
  @IsNotEmpty({ message: "The field description cannot be empty" })
  description!: string;

  @IsString()
  @IsNotEmpty({ message: "The field imageUrl cannot be empty" })
  imageUrl!: string;
}
