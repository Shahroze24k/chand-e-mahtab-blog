# Default Banners for Chand-e-Mahtab Blog

This directory contains default banner images that are offered during blog post creation. These banners are designed to match the website's theme and provide beautiful cover images for different types of content.

## Available Banners

### 📚 Knowledge & Learning (`knowledge-banner.svg`)
- **Theme**: Education, books, learning
- **Colors**: Green gradient background with golden accents
- **Elements**: Open books, reading symbols, knowledge motifs
- **Best for**: Educational posts, tutorials, academic content

### 🌿 Wisdom & Reflection (`wisdom-banner.svg`)
- **Theme**: Wisdom, contemplation, growth
- **Colors**: Light background with green and gold
- **Elements**: Tree of wisdom, crescent moon, natural elements
- **Best for**: Philosophical posts, life lessons, personal growth

### 🕌 Culture & Tradition (`culture-banner.svg`)
- **Theme**: Islamic culture, tradition, heritage
- **Colors**: Dark background with golden patterns
- **Elements**: Geometric patterns, arch designs, cultural motifs
- **Best for**: Cultural posts, religious content, tradition discussions

### ⚡ Youth & Energy (`youth-banner.svg`)
- **Theme**: Youth, motivation, dynamism
- **Colors**: Dynamic gradients from gold to green
- **Elements**: Rising sun, mountains, flying birds, energy bursts
- **Best for**: Youth-focused content, motivational posts, future topics

### 🏛️ Heritage & History (`heritage-banner.svg`)
- **Theme**: Historical heritage, classical elements
- **Colors**: Vintage paper texture with green and gold
- **Elements**: Classical columns, manuscript borders, ornate designs
- **Best for**: Historical posts, heritage discussions, classical content

### 🔧 Modern & Contemporary (`modern-banner.svg`)
- **Theme**: Technology, innovation, contemporary design
- **Colors**: Clean design with green and gold accents
- **Elements**: Geometric shapes, tech elements, modern lines
- **Best for**: Tech posts, modern topics, innovation discussions

## Configuration

The `banners-config.json` file contains:
- Metadata for each banner (names in English and Urdu)
- Descriptions and suitable use cases
- Tags for automatic suggestions
- Category groupings

## Usage in Admin Interface

1. When creating a new post, scroll to the "Banner Selection" section
2. Choose from categorized banners or enter a custom URL
3. Preview your selection before publishing
4. The selected banner will appear as the cover image for your post

## Adding New Banners

To add new default banners:

1. Create an SVG file following the design guidelines:
   - **Dimensions**: 800x300px (8:3 aspect ratio)
   - **Colors**: Use the brand colors (#0B5D1E, #F4C430, #FAFBF8, #14221C)
   - **Style**: Clean, professional, culturally appropriate

2. Save the SVG file in this directory

3. Update `banners-config.json` to include:
   ```json
   {
     "id": "your-banner-id",
     "name": "Banner Name",
     "nameUrdu": "اردو نام",
     "description": "Description in English",
     "descriptionUrdu": "اردو میں تفصیل",
     "path": "/banners/your-banner.svg",
     "tags": ["tag1", "tag2"],
     "suitable_for": ["use case 1", "use case 2"]
   }
   ```

4. Add the banner ID to appropriate categories

## Design Guidelines

- **Aspect Ratio**: 8:3 (800x300px) for optimal display
- **File Format**: SVG preferred for scalability
- **Brand Colors**: 
  - Primary Green: `#0B5D1E`
  - Golden Yellow: `#F4C430`
  - Background: `#FAFBF8`
  - Text Dark: `#14221C`
- **Cultural Sensitivity**: Ensure designs are appropriate for bilingual Islamic content
- **Accessibility**: Maintain good contrast ratios
- **Minimalism**: Clean, uncluttered designs that don't interfere with text overlays

## File Structure

```
banners/
├── README.md                 # This documentation
├── banners-config.json      # Banner metadata and configuration
├── knowledge-banner.svg     # Educational content banner
├── wisdom-banner.svg        # Wisdom and reflection banner
├── culture-banner.svg       # Cultural and traditional banner
├── youth-banner.svg         # Youth and energy banner
├── heritage-banner.svg      # Heritage and history banner
└── modern-banner.svg        # Modern and contemporary banner
```

## Integration

These banners are integrated into the blog through:
- `/src/lib/banners.ts` - Banner management utilities
- `/src/components/admin/BannerSelector.tsx` - Admin selection interface
- Post creation and editing forms in the admin panel
