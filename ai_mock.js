// AI Mock Service
const aiService = {
    // Generate video script based on topic and parameters
    generateScript: function(topic, parameters = {}) {
        const defaultScript = `Title: ${topic}\n\nIntroduction:\nHello everyone! Today we're going to talk about ${topic}. ` +
            `This is an exciting topic that ${parameters.audience || 'viewers'} will find ${parameters.tone || 'interesting'}.\n\n` +
            `Main Content:\nLet's dive right in. First, we'll cover the basics of ${topic}. ` +
            `Did you know that ${this.generateFact(topic)}? ` +
            `This is important because ${this.generateReason(topic)}.\n\n` +
            `Conclusion:\nThat's all for today's video on ${topic}. ` +
            `Don't forget to ${parameters.callToAction || 'like and subscribe'} for more content like this!`;

        return {
            success: true,
            script: defaultScript,
            estimatedDuration: this.estimateDuration(defaultScript),
            suggestions: this.generateSuggestions(topic)
        };
    },

    // Create thumbnail based on type and content
    createThumbnail: function(type, content) {
        const thumbnails = {
            minimal: 'https://images.pexels.com/photos/669996/pexels-photo-669996.jpeg',
            dynamic: 'https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg',
            photo: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg'
        };

        return {
            success: true,
            thumbnailUrl: thumbnails[type] || thumbnails.minimal,
            colors: this.extractColors(content),
            compositionScore: Math.floor(Math.random() * 100)
        };
    },

    // Generate editing suggestions
    generateSuggestions: function(topic) {
        const pacing = [
            "Consider adding a slow-motion effect at the climax",
            "The intro could be shortened by 2-3 seconds",
            "Add a transition between scenes 2 and 3"
        ];
        
        const music = [
            "Upbeat track would work well for this content",
            "Consider adding background music at 0:15",
            "Lower music volume during narration"
        ];

        return {
            pacing: pacing[Math.floor(Math.random() * pacing.length)],
            music: music[Math.floor(Math.random() * music.length)],
            text: `Add text overlay about ${topic.split(' ')[0]} at 0:30`
        };
    },

    // Helper function to generate a random fact
    generateFact: function(topic) {
        const facts = {
            technology: "technology advances at an exponential rate",
            cooking: "the average person spends 5 years of their life eating",
            travel: "there are over 100 million islands in the world"
        };
        
        return facts[topic.toLowerCase()] || `there's more to ${topic} than meets the eye`;
    },

    // Helper function to generate a reason
    generateReason: function(topic) {
        const reasons = {
            technology: "it affects nearly every aspect of our lives",
            cooking: "good nutrition is essential for health",
            travel: "exploring new places broadens our horizons"
        };
        
        return reasons[topic.toLowerCase()] || `understanding ${topic} can be incredibly valuable`;
    },

    // Estimate video duration based on script
    estimateDuration: function(script) {
        const wordCount = script.split(' ').length;
        // Average reading speed is about 150 words per minute
        const minutes = wordCount / 150;
        const seconds = Math.floor((minutes % 1) * 60);
        return `${Math.floor(minutes)}:${seconds.toString().padStart(2, '0')}`;
    },

    // Extract dominant colors from content (mock)
    extractColors: function(content) {
        const palettes = [
            ['#3B82F6', '#10B981', '#F59E0B'],
            ['#EF4444', '#8B5CF6', '#EC4899'],
            ['#14B8A6', '#84CC16', '#F97316']
        ];
        return palettes[Math.floor(Math.random() * palettes.length)];
    },

    // Generate SEO suggestions
    generateSEOSuggestions: function(title, description) {
        return {
            title: `Consider adding "2023" to your title for timeliness`,
            description: `Your description could include more keywords like "${title.split(' ')[0]}"`,
            tags: ["trending", "how-to", "tutorial"]
        };
    }
};

// Make AI service available globally
window.ai = aiService;

// Example usage:
// const script = ai.generateScript("Technology Trends", { audience: "tech enthusiasts", tone: "exciting" });
// const thumbnail = ai.createThumbnail("dynamic", "Technology");
// const suggestions = ai.generateSuggestions("Technology");