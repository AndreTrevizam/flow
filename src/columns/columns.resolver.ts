import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ColumnsService } from './columns.service';
import { Column } from './entities/column.entity';
import { CreateColumnInput } from './dto/create-column.input';
import { UpdateColumnInput } from './dto/update-column.input';

@Resolver(() => Column)
export class ColumnsResolver {
  constructor(private readonly columnsService: ColumnsService) {}

  @Mutation(() => Column)
  createColumn(@Args('createColumnInput') createColumnInput: CreateColumnInput) {
    return this.columnsService.create(createColumnInput);
  }

  @Query(() => [Column], { name: 'columns' })
  findAll() {
    return this.columnsService.findAll();
  }

  @Query(() => Column, { name: 'column' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.columnsService.findOne(id);
  }

  @Mutation(() => Column)
  updateColumn(@Args('updateColumnInput') updateColumnInput: UpdateColumnInput) {
    return this.columnsService.update(updateColumnInput.id, updateColumnInput);
  }

  @Mutation(() => Column)
  removeColumn(@Args('id', { type: () => Int }) id: number) {
    return this.columnsService.remove(id);
  }
}
