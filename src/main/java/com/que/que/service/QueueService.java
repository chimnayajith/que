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

    // Get a user by ID
    public QueueUser getUserById(String id) {
        return userMap.get(id);
    }
    
    // Method to get the next user in the queue
    public void skipUser(String id) {
        QueueUser user = userMap.remove(id);
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

    public List<QueueUser> getAllUsers() {
        List<QueueUser> users = new ArrayList<>(queue);
        users.sort(QueueUser.PRIORITY_COMPARATOR);
        return Collections.unmodifiableList(users);
    }
}