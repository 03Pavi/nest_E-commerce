# Pipes
Description: Transformation and validation

## Transformation Pipe

#### Previous
```typescript
@Get(':id')
findOne(@Param('id') id: number) {
  console.log(typeof id);  // string
  return this.userService.findOne(+id);
}
```

#### After
```typescript
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  console.log(typeof id); // number
  return this.userService.findOne(+id);
}
```

### Custom Pipe Option by Creating Instance
```typescript
findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND })) id: number) {
  console.log(typeof id); // number and if error, it shows status code 404
  return this.userService.findOne(+id);
}
```

### Method Level if All Parameters Have the Same Type
```typescript
@Get(':id')
@UsePipes(ParseIntPipe)
findOne(@Param('id') id: number) {
  console.log(typeof id);
  return this.userService.findOne(+id);
}
```

### Default Value for Parameter
```typescript
@Get(':id')
findOne(@Param('id', ParseIntPipe, new DefaultValuePipe(1)) id: number) {
  console.log(typeof id);
  return this.userService.findOne(+id);
}
```

## Validation Pipe
```typescript
@Patch(':uuid')
update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() updateUserDto: UpdateUserDto) {
  return this.userService.update(uuid, updateUserDto);
}
```

Example request:
```http
GET http://localhost:3000/user/1 
```
Example response:
```json
{
  "message": "Validation failed (uuid is expected)",
  "error": "Bad Request",
  "statusCode": 400
}
```

Example request:
```http
GET http://localhost:3000/user/78b5c181-1d7d-4a03-bfa8-b14ad143e1c5
```
Example response:
```
This action updates user 78b5c181-1d7d-4a03-bfa8-b14ad143e1c5
```

### Custom Validation for UUID for Specific Version
```typescript
@Patch(':uuid')
update(@Param('uuid', new ParseUUIDPipe({ version: '3' })) uuid: string, @Body() updateUserDto: UpdateUserDto) {
  return this.userService.update(uuid, updateUserDto);
}
```

Example request (version 3):
```http
GET http://localhost:3000/user/78b5c181-1d7d-4a03-bfa8-b14ad143e1c5
```
Example response:
```json
{
  "message": "Validation failed (uuid v 3 is expected)",
  "error": "Bad Request",
  "statusCode": 400
}
```


### Enum Pipe


```typescript 

// enum
enum UserType{
  ADMIN = 'ADMIN',
  USER = 'USER'
}


@Get('type')
getUserByType(@Body('type',new ParseEnumPipe(UserType)) type: UserType) {
 return this.userService.getUserByType(type);
}
  
```

### Array Pipe

```http
GET http://localhost:3000/search?id=1,2,4
```
```typescript

@Get('search')
getUserByType(@Query('id',new ParseArrayPipe({items:Number, separator:","})) ids: number[]) {
  console.log(ids)
 return this.userService.getUserByType(type);
}

```
  
```json
[1,2,3]

```