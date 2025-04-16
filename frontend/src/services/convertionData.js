export function generateSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')   // remove special characters
      .trim()
      .replace(/\s+/g, '-');          // replace spaces with hyphens
  }
  
//   const slug = generateSlug("AI ML Course");
//   console.log(slug); // Output: ai-ml-course