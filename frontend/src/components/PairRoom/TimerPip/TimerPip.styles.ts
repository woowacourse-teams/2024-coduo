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
          width: 100%;
          height: 11rem;
          justify-content: center;
          position:relative;
        }

        .container {
          display: flex;
          gap:0.3rem;
        }

      .progress-bar {
        width: 70%;
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

      `;
