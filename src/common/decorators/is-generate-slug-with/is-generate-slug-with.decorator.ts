import { SetMetadata } from '@nestjs/common';

export const IsGenerateSlugWith = (...args: string[]) => SetMetadata('is-generate-slug-with', args);
