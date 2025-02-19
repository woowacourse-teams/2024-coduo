export const styles = `
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

        body { 
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #F6F3F3;
          height: 100%;
          width: 100%;
         
          font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
        }
        
        .timer {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 24px;
          width: 100%;
          height: 100%;
        }
        
        .timer-container {
          width:4rem;
          display:flex;
          justify-content: center;
          align-items: center;
        }
        
        .timer-text {
          font-weight: regular;
          font-size: 55px;
        }

        .layout {
          display: flex;
          align-items: center;
          flex-direction: column;
          width: 230px;
          height: 11rem;
          justify-content: center;
          position:relative;

          margin-top:13px;
        }

        .container {
          display: flex;
          gap:0.3rem;
        }

      .progress-bar {
        width: 80%;
        height: 8px; 
        background: #e4e4e4;  
        border-radius: 6px;
        overflow: hidden;
        margin: 8px 0;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);  
      }

      .progress-bar-fill {
        height: 100%;
        background: linear-gradient(to right, #00E0C8, #00C2AD);  
        border-radius: 4px;
        transition: width 0.3s ease-out;
        box-shadow: 0 0 8px rgba(0, 224, 200, 0.5);
      }
      .warning {
        background: linear-gradient(to right, #FF6B6B, #FF4545);
        box-shadow: 0 0 8px rgba(255, 69, 69, 0.5);
        animation: pulse 1.5s infinite;
      }

      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.6;
        }
        100% {
          opacity: 1;
        }
      }
        button{
          background-color: #F7EAD3;
          border-radius: 0.5rem;
          border: none;
          width: 2.3rem;
          height: 2.1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor:pointer;
        }
      .button-container{
        display: flex;
        align-items: center;
        justify-content:center;
        gap: 4px;
        margin-top:1rem;
      }

      button:hover{
        opacity: 1.2;
        background-color: #f3e2c6;
        transition: all 0.2s;
      }

      .driver-container{
          position:relative;
          left:5px;
          display: flex;
          gap:0.3rem;
          position:absolute;
          left:10px;
          top:10px;
          
          }

      .driver{
          padding: 3px 7px;
          border-radius: 1.2rem;

          background-color:#00E0C8;
          color: white;
          font-size: 11px;
          text-align: center;
  
      }

      .driver-name{
          color: black;
      }

      .

      `;
