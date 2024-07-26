// This code demonstrates the Singleton design pattern in JavaScript
const Singleton = (function(){
    let pManager; // Private variable to store the single instance of ProcessManager
    
    // Private constructor function for the ProcessManager
    function ProcessManager() {
        // ... Some logic or properties for ProcessManager ...
        }



// Private function to create a new instance of ProcessManager11. 
function createProcessManager() {
    pManager = new ProcessManager();
    return pManager;
    }
    // Return an object with a method to access the single instance of ProcessManager
    return {
        getProcessManager: () => {
            if (!pManager) {
                // If pManager doesn't exist, create a new instance
                pManager = createProcessManager();
            }
            return pManager; // Return the single instance of ProcessManager
            }
        }
    })();
    // Get the singleton instance of ProcessManager
    const singleton = Singleton.getProcessManager();
    // Get another reference to the same singleton instance
    const singleton2 = Singleton.getProcessManager();
    // Check if both references point to the same instance (true)
    console.log(singleton === singleton2); // true