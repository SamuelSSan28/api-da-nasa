import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MarsService {
  rl_rules = {
    L: {
      N: 'W',
      W: 'S',
      E: 'N',
      S: 'W',
    },
    R: {
      N: 'E',
      W: 'N',
      E: 'S',
      S: 'E',
    },
  };

  validateBounds(currentPosition: any[], terrain_boundaries: number[]) {
    if (
      currentPosition[0] > terrain_boundaries[0] ||
      currentPosition[1] > terrain_boundaries[1]
    )
      throw new BadRequestException({
        message: 'Movement greater than terrain boundaries',
      });

    if (currentPosition[0] < 0 || currentPosition[1] < 0)
      throw new BadRequestException({
        message: 'Movement less than terrain boundaries',
      });
  }

  move(input: string) {
    let currentPosition = [0, 0, 'N']; // x,y,O
    const terrain_boundaries = [5, 5];

    for (let index = 0; index < input.length; index++) {
      const order = input[index];
      this.updatePosition(currentPosition, order);
      this.validateBounds(currentPosition, terrain_boundaries);
    }

    return currentPosition;
  }

  updatePosition(currentPosition: any[], order: string) {
    switch (order) {
      case 'M':
        this.mOrder(currentPosition);
        break;
      case 'L':
        this.lrOrder(currentPosition, order);
        break;
      case 'R':
        this.lrOrder(currentPosition, order);
        break;
      default:
        throw new BadRequestException({
          message: `${order} is not an unrecognized move command`,
        });
    }
  }

  mOrder(currentPosition: any[]) {
    const orientation = currentPosition[2];
    switch (orientation) {
      case 'N':
        currentPosition[1] = +currentPosition[1] + 1;
        break;
      case 'S':
        currentPosition[1] = +currentPosition[1] - 1;
        break;
      case 'E':
        currentPosition[0] = +currentPosition[0] + 1;
        break;
      case 'W':
        currentPosition[0] = +currentPosition[0] - 1;
        break;
      default:
        throw new BadRequestException({
          message: `${orientation} is not an unrecognized move command`,
        });
    }
  }

  lrOrder(currentPosition: any[], orderMoviment: string) {
    const orientation = currentPosition[2];
    try {
      currentPosition[2] = this.rl_rules[orderMoviment][orientation];
    } catch (error) {
      throw new BadRequestException({
        message: `${orderMoviment} is not an unrecognized move command`,
      });
    }
  }
}
