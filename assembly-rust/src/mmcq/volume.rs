use super::color::Color;

use std::cmp;
use std::collections::HashMap;

#[derive(Copy, Clone)]
pub struct Pixel {
  pub color: Color,
  pub count: u32,
}

pub struct Volume {
  pub pixels: HashMap<u32, Pixel>,
  pub size: u32,
}

impl Volume {
  pub fn from_colors(colors: &[Color], algorithm: u8) -> Volume {
    let mut volume = Volume {
      pixels: HashMap::new(),
      size: 0,
    };

    for color in colors {
      let pixel = Pixel {
        color: *color,
        count: 1,
      };

      let idx = pixel.color.compose(algorithm);

      match volume.pixels.get_mut(&idx) {
        Some(x) => x.count += 1,
        None => {
          volume.pixels.insert(pixel.color.compose(algorithm), pixel);
        }
      }

      volume.size += 1;
    }

    volume
  }

  pub fn get_main_color(&self) -> Color {
    let mut color = Color::new(0, 0, 0);
    if self.size == 0 {
      return color;
    }

    let mut size = 0;

    for pixel in self.pixels.values() {
      if pixel.count > size {
        size = pixel.count;
        color = pixel.color;
      }
    }

    color
  }

  pub fn split(&self, bit: u8) -> (Volume, Volume) {
    let mut left = Volume {
      pixels: HashMap::new(),
      size: 0,
    };

    let mut right = Volume {
      pixels: HashMap::new(),
      size: 0,
    };

    let (dimension, middle) = get_max_dimension(self);

    for &pixel in self.pixels.values() {
      let idx = pixel.color.compose(bit);

      let next = if pixel.color.get(dimension) > middle {
        &mut right
      } else {
        &mut left
      };

      next.size += pixel.count;

      match next.pixels.get_mut(&idx) {
        Some(x) => x.count += pixel.count,
        None => {
          next.pixels.insert(idx, pixel);
        }
      };
    }

    (left, right)
  }
}

fn get_max_dimension(volume: &Volume) -> (usize, u8) {
  if volume.pixels.len() == 0 {
    return (0, 0);
  }

  let mut max: [u8; 3] = [0; 3];
  let mut min: [u8; 3] = [0xff; 3];

  for pixel in volume.pixels.values() {
    for idx in 0..=2 {
      let color_value = pixel.color.get(idx);
      max[idx] = cmp::max(color_value, max[idx]);
      min[idx] = cmp::min(color_value, min[idx]);
    }
  }

  let r = max[0] - min[0];
  let g = max[1] - min[1];
  let b = max[2] - min[2];

  let dimension = if r >= g && r >= b {
    0
  } else if g >= r && g >= b {
    1
  } else {
    2
  };

  let mid = ((max[dimension] as u16 + min[dimension] as u16) / 2) as u8;

  (dimension, mid)
}
