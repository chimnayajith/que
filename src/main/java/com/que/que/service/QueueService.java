package com.que.que.service;

import com.que.que.model.QueueUser;
import java.util.HashMap;
import java.util.PriorityQueue;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public class QueueService {
    private final PriorityQueue<QueueUser> queue;
    private final HashMap<Integer, QueueUser> userMap;

    public QueueService() {
        // Initialize the PriorityQueue with the custom comparator
        this.queue = new PriorityQueue<>(QueueUser.PRIORITY_COMPARATOR);
        this.userMap = new HashMap<>();
    }

    // Method to add a user to the queue
    public void joinQueue(QueueUser user) {
        if (!userMap.containsKey(user.getTokenNumber())) {
            queue.add(user);
            userMap.put(user.getTokenNumber(), user);
        } else {
            System.out.println("User with this ID already exists!");
        }
    }

    // Get a user by ID/token
    public QueueUser getUserById(int token) {
        return userMap.get(token);
    }
    
    // Method to get the next user in the queue
    public void skipUser(int token) {
        QueueUser user = userMap.remove(token);
        if (user != null) {
            queue.remove(user);
        }
    }

    // Retrieve and remove the next user from the queue
    public QueueUser callNext() {
        QueueUser next = queue.poll();
        if (next != null) {
            userMap.remove(next.getTokenNumber());
        }
        return next;
    }

    // get position of the user in queue
    public int getPosition(int token) {
        if (!userMap.containsKey(token)) {
            return -1;
        }
        List<QueueUser> users = new ArrayList<>(queue);
        users.sort(QueueUser.PRIORITY_COMPARATOR);
        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).getTokenNumber() == token) {
                return i + 1;
            }
        }
        return -1;
    }

    public List<QueueUser> getAllUsers() {
        List<QueueUser> users = new ArrayList<>(queue);
        users.sort(QueueUser.PRIORITY_COMPARATOR);
        return Collections.unmodifiableList(users);
    }
}