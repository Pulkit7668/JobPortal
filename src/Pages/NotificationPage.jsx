import { useState, useEffect } from "react";
import { BriefcaseIcon, Bell, CheckCircle2, AlertCircle, MessageSquare, Building2, UserCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function NotificationPage() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  // Simulate fetching notifications from an API
  const fetchNotifications = (pageNumber) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date();
        const notifications = [];
        
        const companies = [
          { name: "Google", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAzFBMVEVHcEz////////+/v77+/vx8fL9/f309fX+/v739/f////09PXOz8/5+vr8/P3////////29vf///////84qlf8wAdGiPX8/PzsUUTqQjQsqFLrSj3S3/w6g/TqPCs0gPQgpUf85+bv9P+63sL62Nb+8ef4ycbw+PJkunkeePP81HXwgGv0jhzc5/3o9efX7N5Fr19Uj/WQy562zPr2trL94KDzoJrzoJv80Gjyl5H94qgyh9v7xzihsSp+wYV1sE5ZtXBmmvUynoWKrvzKDGT6AAAAE3RSTlMAW+TTeBLcHLMt1WsKzfUznkBIxSDAuAAAAUZJREFUKJFtktligkAMRUFZxKVuDMOAggpu1apVu+/t//9TkxBU1PsySQ4hlyGadpTd0fWOrV2R3eqyWhe80j1RpYCc7pmcI2tyaZimQw6bOTMplU9hpKIofJSUmgwtTCYq9EFhqKIJ5lbGdGIRAGhUQLNX6wRLOA2Y8vdpuvfVOJtaOjhdhL56yYrjU8cGFsRSLc4/x+DPfxBiSZN6LMlXUYXzVghBT8/7pPkdxFX28yzEO8HYI8U9dlQudMZx3AeInWWe+SrExxrhCLTre3E+M3P7FXznLn887z53a2PwGbjBLLvUP2jcYUC/FYdOA9d1g22SbN1fbizT9bUxXA+QguB4G2GlfbIFqw1i0GCzKmzDDQ1LZgPQLKHk5rAJpmSj0ykH0jxArW4V79yqF1bMkEckjYvFrTWIy0btApFsx7m68Ff1D4OdMHbngtKsAAAAAElFTkSuQmCC" },
          { name: "Microsoft", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAABnRSTlMAAAAAAABupgeRAAAAWklEQVR4AWP4FKBEJPrip8wABrV7GOp3EYtGhgWjFoxaMGrBqAXf/OSIRD995CEWVO9hqN1FLBoOYNlnotF3iI7/O4lHQOVL3hONPo9agB2NWjBqwagFoxYAAB2zMZ7bQW2tAAAAAElFTkSuQmCC" },
          { name: "Amazon", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADsUlEQVRYhbWWT2gcVRzHP8/sBsSkpkLUpdlQRAgptexuqrR6EcxqDipWacCLB4PJwUNpwEUwiAgt4sE/NHdLwIM1NFvw4CUU04JJs7HSRDYbD1VCNiRBiTtJDmnh62F3pjOZyc40ab/wmHlvfu/9vu/7+/3eG6hBUpOkjyXN6+HhlqRBSY/ihqQOSX8+RMdBRNoBjKQm4CbwLBFhWRYLCwtO3xhDIpEgkUhEXQJgFjiOpE+j0h7L59WdzSoWjzutwfXenc1qLJ+/HyXOoAjSVyoVdWezHmf1Wi6Xi0qgQBSr07293l3HYqFkIiqxFUogn88HOkhlMjrd2+sLid1eyWajEFAogQ/6+0MlzuVygSSi4JGwVDXG+MaGhoY8/b6+PgROux8YSaFz3GVnjCGTyfhs4o2Nnr6Au9vboQRiUVg2NzfT1dXl9JeXlymXy/w6OQnAxMRE1akUqNi+CdhOv7t4kR9HR5mbnfV8E2AIDlcooiTKWD6vtmQyMNHqlWMUhObAzMwMJ06edHZpPwEGz54l2d7Okc5OXuvp8akSJQdCFUil076ddWezWlpa8tjtVYG6BEqlUuDChULBY1cul30haXgQ50Bxft6R0y2tuyIAisWi825cz+Xl5dAI1CWwuLjoWdR+tyzLY/fDpUuB829MT4cSqBuC8fFx5/LZ7SgeGRnx2dhhSGcyqlQqdUNQl4A7tjtLL5VOqy2Z3LUM7fELw8N7JyD5r+LdWiqT8Y21JZMqlUr7I2D/jPh2WJO8oRYSy7KcW9FWKMx5JAI2iQvDww6RhlhMqUxG/QMDvpI8d/68+gcGZFmu2G8sSavT0soNadubE96T8I9v4bEkHH47PHujYKsMUx/Cav5eLR/7Bo6ccUy8ZXioB37rh6unYK2wfwKNB+DoJ/D6ErxTgaZO3w+Dl0BLB7xxG7b/hfHnq0T+ugx3NvZGYHUK5s7BT4dgswwbRWh90WNiJN0FGjyjdyy4+Rnc/gpUu4CS70PLMXjypSrReDO+OeslWJ+D1WuwcgW2/6meXCcuQ/wAzH0Or/7invWfkXQLeC5wB2sFmHwPNov3jsOdd6dxje38HXjqLUh/AY93wNp0lURLh9viupH0EfBlIAEbf4/B/Newfo2ge1ly+TbAM4Nw+F1oPV53WWDASGoEpoBUmDVbZVibgs1FWLlac2ggfrAanoNHofUFf3iCcR14ubYDPS3pSpQz4QHhe0lP2II5kHQKeBPoYre82Dt+B2aAUWPMz/bg/5AZ2OKL1i4FAAAAAElFTkSuQmCC" },
          { name: "Meta", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAV1BMVEVHcEwBd/AAdfABbugAdO8BefMAf/kAePMBde8DauQAYt4DZeACZ+IBcOwAgPkAgPkAfvcAefMDaOIGaOEAffYAfvgBcesAf/kFaOIBa+YAfPYAd/AAgPoq+0lHAAAAHXRSTlMAL2eIGUZ3OCjk///BDP/vxFaf//+1/pj3/6n/3OvYZQsAAAEoSURBVHgB1c5bkoMgEAXQK4Ia0WsMLRN09r/OoQuoWLODnC+afuKbdKY3Fo0bhhF302PO/LKWNNV2K3Gz8tkEYGBlUI01Xyo0byb3JLmj0HQP2MVnO7lB9STLylfOm/LyPgRK+cZBPpGtuW1BsYTgo0NF0uqo4L1F9QghdKh+yB8A75QWNJJ3vFFZIQGbUtpRHYx5RI9qE07YY4wrCkduuqTFp3BHnwtuVzkXPjcPwh7ndT0/R/0Cy+yDg8IuPHFc1wmFieQErPPc7nTCA4dILdiYw6z3PrygRv05RZ5tAaHwDiF1yHbyxECyBhxQGkNKsfYMOkYnG+qF1SvF+LBwIhx1dbOiecR4ZSJbOb6Y0GBtBSOybqPOt7hbrkwcis6YDv/Y3Th8iz/1MRTTkr9PVgAAAABJRU5ErkJggg==" }
        ];

        const jobTitles = [
          "Senior Frontend Developer",
          "Full Stack Engineer",
          "React Developer",
          "Software Architect",
          "UI/UX Developer"
        ];
        
        // Generate notifications for the last 7 days
        for (let i = 0; i < 10; i++) {
          const randomHours = Math.floor(Math.random() * 168); // 7 days in hours
          const timestamp = new Date(now.getTime() - randomHours * 60 * 60 * 1000);
          
          const types = ["application", "interview", "recommendation", "profile", "message", "company", "shortlist"];
          const randomType = types[Math.floor(Math.random() * types.length)];
          const randomCompany = companies[Math.floor(Math.random() * companies.length)];
          const randomJob = jobTitles[Math.floor(Math.random() * jobTitles.length)];
          
          const notification = {
            id: pageNumber * 100 + i,
            type: randomType,
            user: {
              name: randomCompany.name,
              avatar: randomCompany.logo
            },
            content: "",
            timestamp,
            companyLogo: randomCompany.logo,
            jobTitle: randomJob
          };

          // Set content based on notification type
          switch (randomType) {
            case "application":
              notification.content = `Your application for ${randomJob} position has been received`;
              notification.status = "Under Review";
              break;
            case "interview":
              notification.content = `Interview scheduled for ${randomJob} position`;
              notification.status = "Scheduled";
              break;
            case "recommendation":
              notification.content = `New job recommendation: ${randomJob}`;
              break;
            case "profile":
              notification.content = "Your profile has been viewed 15 times this week";
              break;
            case "message":
              notification.content = `HR team has sent you a message regarding ${randomJob} position`;
              break;
            case "company":
              notification.content = `${randomCompany.name} has posted a new job that matches your profile`;
              break;
            case "shortlist":
              notification.content = `You've been shortlisted for ${randomJob} position`;
              notification.status = "Shortlisted";
              break;
          }

          notifications.push(notification);
        }

        // Sort by timestamp
        notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        resolve(notifications);
      }, 1000);
    });
  };

  useEffect(() => {
    loadMoreNotifications();
  }, []);

  const loadMoreNotifications = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const newNotifications = await fetchNotifications(page);
      if (newNotifications.length > 0) {
        setVisibleNotifications(prev => [...prev, ...newNotifications]);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore && !loading) {
      loadMoreNotifications();
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "application":
        return <BriefcaseIcon className="w-6 h-6 text-blue-500" />;
      case "interview":
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case "recommendation":
        return <AlertCircle className="w-6 h-6 text-purple-500" />;
      case "profile":
        return <UserCheck className="w-6 h-6 text-indigo-500" />;
      case "message":
        return <MessageSquare className="w-6 h-6 text-orange-500" />;
      case "company":
        return <Building2 className="w-6 h-6 text-gray-500" />;
      case "shortlist":
        return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      case "Scheduled":
        return "bg-green-100 text-green-800";
      case "Shortlisted":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const groupNotificationsByDate = (notifications) => {
    const groups = {};
    
    notifications.forEach(notification => {
      const date = notification.timestamp.toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
    });

    return groups;
  };

  const getDateHeader = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  const groupedNotifications = groupNotificationsByDate(visibleNotifications);

  return (
    <div className="min-h-screen bg-gray-50 mt-5">
      <div className="mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900">Job Notifications</h1>
            <div className="flex items-center gap-2">
              <Bell className="text-gray-500 w-5 h-5" />
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {visibleNotifications.length}
              </span>
            </div>
          </div>
          
          <div 
            className="h-[calc(85vh-4rem)] overflow-y-scroll"
            onScroll={handleScroll}
          >
            {Object.entries(groupedNotifications).map(([date, notifications]) => (
              <div key={date} className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-500 sticky top-0 bg-white py-2 px-6">
                  {getDateHeader(date)}
                </h2>
                
                <div className="space-y-4 px-6">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 border border-gray-100"
                    >
                      <img 
                        src={notification.companyLogo} 
                        alt={notification.user.name}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900">{notification.user.name}</span>
                          {notification.status && (
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(notification.status)}`}>
                              {notification.status}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mt-1 break-words">{notification.content}</p>
                        {notification.jobTitle && (
                          <p className="text-sm text-blue-600 mt-1 font-medium">{notification.jobTitle}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">
                          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                        </p>
                      </div>

                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}

            {!hasMore && visibleNotifications.length > 0 && (
              <div className="text-center py-4 text-gray-500">
                You're all caught up with job notifications!
              </div>
            )}

            {visibleNotifications.length === 0 && !loading && (
              <div className="text-center py-10">
                <BriefcaseIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No job notifications yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;