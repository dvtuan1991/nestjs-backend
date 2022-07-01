import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Comment } from "./schema/comment.schema";

@Controller('comment')
export class CommentController {
  constructor(private readonly commnetService: CommentService) {}
  @Post()
  createComment (@Body() data: Comment) {
    return this.commnetService.createComment(data)
  }

  @Get('/:productId/product')
  async getListCommentByProductId (@Param("productId") productId: string) {
    return this.commnetService.getCommentByProductId(Number(productId));
  }
}