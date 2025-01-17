pub mod color;
pub mod volume;

pub use color::Color;
pub use volume::Volume;

pub fn get_palette(colors: &[Color], color_count: u8, algorithm: u8) -> Vec<Color> {
  let mut volumes = vec![];

  let volume = Volume::from_colors(colors, algorithm);
  volumes.push(volume);

  while volumes.len() < color_count as usize {
    let mut new_volumes = vec![];

    for volume in &volumes {
      let (left, right) = volume.split(algorithm);

      if left.size > 0 {
        new_volumes.push(left);
      }

      if right.size > 0 {
        new_volumes.push(right);
      }
    }

    let len = volumes.len();

    if new_volumes.len() == len {
      break;
    }

    volumes = new_volumes;
    volumes.sort_by(|a, b| b.size.cmp(&a.size));
  }

  let mut main_colors = vec![];

  for volume in volumes {
    if main_colors.len() < color_count as usize {
      main_colors.push(volume.get_main_color());
    }
  }

  let mut similar_colors: Vec<SimilarColor> = main_colors
    .iter()
    .map(|_| SimilarColor {
      color: Color::new(0, 0, 0),
      delta: 255f64.powf(2.0) * 3.0,
    })
    .collect();

  for &color in colors {
    for (idx, s_color) in similar_colors.iter_mut().enumerate() {
      if let Some(main_color) = main_colors.get(idx) {
        let delta = color.delta_by_arr(&main_color);

        if delta < s_color.delta {
          s_color.color = color;
          s_color.delta = delta;
        }
      }
    }
  }

  similar_colors.iter().map(|s| s.color).collect()
}

struct SimilarColor {
  delta: f64,
  color: Color,
}
