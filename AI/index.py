import datetime
import webbrowser
import random
import json
import os

class PersonalAssistant:
    def __init__(self, name="Assistant"):
        self.name = name
        self.commands = {
            "hello": self.greet,
            "time": self.get_time,
            "date": self.get_date,
            "search": self.search_web,
            "joke": self.tell_joke,
            "note": self.take_note,
            "read notes": self.read_notes,
            "help": self.show_help,
            "exit": self.exit_assistant
        }
        self.notes_file = "assistant_notes.json"
        self.load_notes()
        self.running = True
        
    def load_notes(self):
        """Load saved notes if they exist"""
        self.notes = []
        if os.path.exists(self.notes_file):
            try:
                with open(self.notes_file, 'r') as f:
                    self.notes = json.load(f)
            except:
                print(f"{self.name}: Could not load notes file. Starting with empty notes.")
    
    def save_notes(self):
        """Save notes to file"""
        with open(self.notes_file, 'w') as f:
            json.dump(self.notes, f)
    
    def process_command(self, user_input):
        """Process the user input and execute appropriate command"""
        user_input = user_input.lower().strip()
        
        # Check for exact command matches
        if user_input in self.commands:
            return self.commands[user_input]()
        
        # Check for commands that start with specific keywords
        for cmd in self.commands:
            if user_input.startswith(cmd + " "):
                args = user_input[len(cmd) + 1:]
                return self.commands[cmd](args)
        
        # If no command matches, try to give a helpful response
        return self.default_response(user_input)
    
    def default_response(self, input_text):
        """Handle inputs that don't match known commands"""
        if "weather" in input_text:
            return "I'm sorry, I don't have access to weather information yet."
        elif any(word in input_text for word in ["thank", "thanks"]):
            return f"You're welcome! Is there anything else I can help with?"
        elif "name" in input_text:
            return f"My name is {self.name}. Nice to chat with you!"
        else:
            return f"I'm not sure how to respond to that. Type 'help' to see what I can do."
    
    def greet(self, *args):
        """Greet the user"""
        greetings = [
            f"Hello! How can I help you today?",
            f"Hi there! What can I do for you?",
            f"Greetings! How may I assist you?"
        ]
        return random.choice(greetings)
    
    def get_time(self, *args):
        """Return the current time"""
        current_time = datetime.datetime.now().strftime("%H:%M:%S")
        return f"The current time is {current_time}"
    
    def get_date(self, *args):
        """Return the current date"""
        current_date = datetime.datetime.now().strftime("%A, %B %d, %Y")
        return f"Today is {current_date}"
    
    def search_web(self, query=""):
        """Search the web for a query"""
        if not query:
            return "What would you like to search for?"
        
        search_url = f"https://www.google.com/search?q={query.replace(' ', '+')}"
        webbrowser.open(search_url)
        return f"I've opened a search for '{query}'"
    
    def tell_joke(self, *args):
        """Tell a random joke"""
        jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!",
            "Why was the computer cold? It left its Windows open!",
            "How does a computer get drunk? It takes screenshots!"
        ]
        return random.choice(jokes)
    
    def take_note(self, note_text=""):
        """Save a note from the user"""
        if not note_text:
            return "What would you like me to remember?"
        
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.notes.append({"text": note_text, "timestamp": timestamp})
        self.save_notes()
        return f"I've made a note of that: '{note_text}'"
    
    def read_notes(self, *args):
        """Read back saved notes"""
        if not self.notes:
            return "You don't have any saved notes yet."
        
        notes_text = "Here are your notes:\n"
        for i, note in enumerate(self.notes, 1):
            notes_text += f"{i}. [{note['timestamp']}] {note['text']}\n"
        return notes_text
    
    def show_help(self, *args):
        """Show available commands"""
        help_text = f"Here's what I can do:\n"
        help_text += "- hello: Greet me\n"
        help_text += "- time: Get the current time\n"
        help_text += "- date: Get the current date\n"
        help_text += "- search [query]: Search the web\n"
        help_text += "- joke: Tell a joke\n"
        help_text += "- note [text]: Save a note\n"
        help_text += "- read notes: See your saved notes\n"
        help_text += "- help: See this help message\n"
        help_text += "- exit: Close the assistant\n"
        return help_text
    
    def exit_assistant(self, *args):
        """Exit the assistant"""
        self.running = False
        return "Goodbye! Have a great day!"
    
    def run(self):
        """Run the assistant in a loop"""
        print(f"{self.name}: Hello! I'm your personal assistant. Type 'help' to see what I can do.")
        
        while self.running:
            user_input = input("You: ").strip()
            if not user_input:
                continue
                
            response = self.process_command(user_input)
            print(f"{self.name}: {response}")
            
            if not self.running:
                break


if __name__ == "__main__":
    assistant = PersonalAssistant("Alex")
    assistant.run()