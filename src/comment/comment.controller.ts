import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './schema/comment.schema';

@Controller('comment')
export class CommentController {
  constructor(private readonly commnetService: CommentService) {}
  @Post()
  createComment(@Body() data: Comment) {
    return this.commnetService.createComment(data);
  }

  @Get('/:productId/product')
  async getListCommentByProductId(
    @Param('productId') productId: string,
    @Query('index') index: string,
    @Query('limit') limit: string,
    @Query('point') point: string,
    @Query('sort') sort: string,
  ) {
    return this.commnetService.getListCommnetByProductIdAndLimit(
      Number(productId),
      Number(index),
      Number(limit),
      Number(point),
      sort,
    );
  }

  @Get('/:productId/product/static')
  async staticCommentInProduct(@Param('productId') productId: string) {
    return this.commnetService.statisticListProductComment(Number(productId));
  }

  @Get('/:productId/product/avg')
  async getAvgPointByProduct(@Param('productId') productId: string) {
    return this.commnetService.getAvgPoint(Number(productId));
  }
}
